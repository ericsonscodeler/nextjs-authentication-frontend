import api from '@/src/lib/axios'
import { NextAuthOptions } from 'next-auth'
import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {
          label: 'Username',
          type: 'text',
          placeholder: 'Ericson',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null
        }

        const { username, password } = credentials
        const res = await api.post(
          '/auth/login',
          {
            username,
            password,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
        if (res.status === 401) {
          console.log(res.statusText)

          return null
        }

        const user = res.data
        return user
      },
    }),
  ],
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
