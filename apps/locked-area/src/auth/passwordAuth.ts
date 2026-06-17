export const passwordAuth = {
  login: async (email: string, password: string) => {
    const validEmail = 'moh17670s@gmail.com';
    const validPassword = 'boost2025';

    if (email === validEmail && password === validPassword) {
      return { success: true };
    }
    return { success: false, error: 'Felaktig e-post eller lösenord' };
  },
  logout: async () => {},
  resetPassword: async (email: string) => {
    if (email) return { success: true };
    return { success: false, error: 'Email required' };
  },
};