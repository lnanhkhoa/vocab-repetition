'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

const signInSchema = z.object({
  email: z.email({ message: 'Invalid email address.' }),
  password: z.string().min(1, { message: 'Password is required.' })
})

type SignInForm = z.infer<typeof signInSchema>

export default function SignInPage() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: 'lnanhkhoa303@gmail.com',
      password: '121104'
    }
  })

  const onSubmit = async (variables: SignInForm) => {
    // Add sign-in logic here
    const { error, data } = await supabase.auth.signInWithPassword({
      email: variables.email,
      password: variables.password
    })

    if (error) {
      console.error('Error signing in:', error)
    }

    if (data) {
      console.log('User signed in:', data)
      router.push('/dashboard')
    }
  }

  return (
    <div className='flex min-h-screen items-center justify-center bg-muted'>
      <Card className='w-full max-w-sm'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle className='text-2xl text-center'>Sign In</CardTitle>
          </CardHeader>
          <CardContent className='flex flex-col gap-4 pb-4'>
            <div>
              <label className='block mb-1 font-medium' htmlFor='email'>
                Email
              </label>
              <Input id='email' type='email' placeholder='you@example.com' {...register('email')} autoComplete='email' />
              {errors.email && <div className='text-red-500 text-sm mt-1'>{errors.email.message}</div>}
            </div>
            <div>
              <label className='block mb-1 font-medium' htmlFor='password'>
                Password
              </label>
              <Input id='password' type='password' placeholder='••••••••' {...register('password')} autoComplete='current-password' />
              {errors.password && <div className='text-red-500 text-sm mt-1'>{errors.password.message}</div>}
            </div>
          </CardContent>
          <CardFooter>
            <Button type='submit' className='w-full'>
              Sign In
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
