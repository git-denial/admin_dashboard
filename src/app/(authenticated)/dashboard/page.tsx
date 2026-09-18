import DashboardApi from "@/app/api/DashboardApi"
import { Metadata } from "next/types"
import { Decimal } from "@prisma/client/runtime/library"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "dashboard",
}

export default async function DashboardPage() {
  const stats = await DashboardApi.getStats()

  const formatCurrency = (value: number | string | Decimal) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(Number(value))
  }

  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <div>
        <h1 className="text-lg font-semibold md:text-2xl">
          Dashboard
        </h1>

        <p className="text-sm text-muted-foreground">
          Overview of your healthcare platform.
        </p>
      </div>

      {/* Main Statistics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

        {/* Users */}
        <div className="rounded-lg border bg-card p-5 shadow-sm">
          <p className="text-sm font-medium text-muted-foreground">
            Total Users
          </p>

          <p className="mt-2 text-3xl font-bold">
            {stats.users.total}
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            Registered users
          </p>
        </div>

        {/* Cardiologists */}
        <div className="rounded-lg border bg-card p-5 shadow-sm">
          <p className="text-sm font-medium text-muted-foreground">
            Cardiologists
          </p>

          <p className="mt-2 text-3xl font-bold">
            {stats.cardiologists.total}
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            Registered cardiologists
          </p>
        </div>

        {/* Consultations */}
        <div className="rounded-lg border bg-card p-5 shadow-sm">
          <p className="text-sm font-medium text-muted-foreground">
            Consultations
          </p>

          <p className="mt-2 text-3xl font-bold">
            {stats.consultations.total}
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            Total consultations
          </p>
        </div>

        {/* Revenue */}
        <div className="rounded-lg border bg-card p-5 shadow-sm">
          <p className="text-sm font-medium text-muted-foreground">
            Total Revenue
          </p>

          <p className="mt-2 text-2xl font-bold">
            {formatCurrency(stats.consultations.revenue)}
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            From consultations
          </p>
        </div>

        {/* Pending */}
        <div className="rounded-lg border bg-card p-5 shadow-sm">
          <p className="text-sm font-medium text-muted-foreground">
            Pending
          </p>

          <p className="mt-2 text-3xl font-bold">
            {stats.consultations.pending}
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            Awaiting examination
          </p>
        </div>

        {/* Examined */}
        <div className="rounded-lg border bg-card p-5 shadow-sm">
          <p className="text-sm font-medium text-muted-foreground">
            Examined
          </p>

          <p className="mt-2 text-3xl font-bold">
            {stats.consultations.examined}
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            Completed consultations
          </p>
        </div>
      </div>

      {/* Consultation Breakdown */}
      <div className="rounded-lg border shadow-sm">
        <div className="border-b p-5">
          <h2 className="font-semibold">
            Consultation Overview
          </h2>

          <p className="text-sm text-muted-foreground">
            Breakdown of consultation status and revenue.
          </p>
        </div>

        <div className="grid gap-4 p-5 sm:grid-cols-2">

          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">
              Pending Consultations
            </p>

            <p className="mt-2 text-2xl font-bold">
              {stats.consultations.pending}
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              {formatCurrency(
                stats.consultations.pendingRevenue
              )}
            </p>
          </div>

          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">
              Examined Consultations
            </p>

            <p className="mt-2 text-2xl font-bold">
              {stats.consultations.examined}
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              {formatCurrency(
                stats.consultations.examinedRevenue
              )}
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}
