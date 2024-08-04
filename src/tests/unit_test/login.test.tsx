import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Page from '@/app/(unauthenticated)/login/page';
 
describe('homepage', () => {
    it('renders', () => {
      render(<Page />);
  
      expect(screen.getByText('Login')).toBeDefined()
      expect(screen.getByText('Username')).toBeDefined()
      expect(screen.getByText('Password')).toBeDefined()
    });
  });