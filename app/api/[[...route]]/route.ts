import { clerkMiddleware, getAuth } from '@hono/clerk-auth'

import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import z from 'zod'
import { zValidator } from '@hono/zod-validator'
import authors from './authors'
import books from './books'

export const runtime = 'edge'


const app = new Hono().basePath('/api')
// app.use('*', clerkMiddleware())
app.route('/authors', authors)
app.route('/books', books)

app.get('/hello', clerkMiddleware(), (c) => {
  const auth = getAuth(c)
  if (!auth?.userId) {
    return c.json({ message: 'Unauthorized' })
  }
  return c.json({
    message: 'Hello Next.js!',
    userId: auth.userId,
  })
}).get("/hello/:name", 
  zValidator('param', z.object({ name: z.string()})),
  (c) => {
    const name = c.req.valid('param')
    return c.json({
      message: name,
    })
}).post("/", zValidator(
  'json', 
  z.object({ userId: z.string(), name: z.string()})),
  (c) => {
    const { userId, name } = c.req.valid('json')
    return c.json({
      userId,
      name
    })
  }
)

export const GET = handle(app)
export const POST = handle(app)
