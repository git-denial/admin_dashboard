import { AuthError, authRole, decodeJWTToken, generateJWToken } from "@/lib/auth";
import { AUTH_TOKEN } from "@/lib/constants";
import { db } from "@/lib/prisma";
import { cookies, headers } from "next/headers";
import redis from '../../server/redis';



const DashboardApi = {

    async getStats() {

        let token = cookies().get(AUTH_TOKEN)?.value + ''
        if (!authRole(token, "ADMIN")) throw new AuthError("Unauthorized access")

        const redisKey = `cache:dashboard:getstats`;
        const cachedData = await redis.get(redisKey)
        console.log(cachedData)

        if (cachedData) return JSON.parse(cachedData)
        else {

            const [userStats, cardiologistStats, consultationStats, consultationStatusStats] = await Promise.all([

                db.users.aggregate({ _count: { id: true } }),

                db.cardiologists.aggregate({ _count: { id: true } }),

                db.consultations.aggregate({ _count: { id: true }, _sum: { payment: true } }),

                db.consultations.groupBy({ by: ["status"], _count: { id: true }, _sum: { payment: true } })
            ])


            const pending = consultationStatusStats.find((item) => item.status === "PENDING")

            const examined = consultationStatusStats.find((item) => item.status === "EXAMINED")

            let result = {
                users: { total: userStats._count.id },
                cardiologists: { total: cardiologistStats._count.id },

                consultations: {
                    total: consultationStats._count.id,
                    revenue: consultationStats._sum.payment ?? 0,

                    pending: pending?._count.id ?? 0,
                    examined: examined?._count.id ?? 0,

                    pendingRevenue: pending?._sum.payment ?? 0,
                    examinedRevenue: examined?._sum.payment ?? 0,
                }
            }

            await redis.set(redisKey, JSON.stringify(result), { expiration: { type: 'EX', value: 60 } })

            return result
        }

    }
}

export default DashboardApi
