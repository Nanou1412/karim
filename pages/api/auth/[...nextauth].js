import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com'
        const adminPassword = process.env.ADMIN_PASSWORD || 'changeme'
        if (!credentials) return null
        if (credentials.email === adminEmail && credentials.password === adminPassword) {
          return { id: '1', name: 'Admin', email: adminEmail }
        }
        return null
      }
    })
  ],
  session: { strategy: 'jwt' },
  pages: { signIn: '/login' }
})
