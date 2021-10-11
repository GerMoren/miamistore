import { useState } from 'react'
import { GetServerSideProps } from 'next'

import { Typography } from '@material-ui/core'
import { Layout } from '@components/Layout'
import { AccessDenied } from '@components/AccessDenied'
import { Comment, CommentProps } from '@components/Wall/Comments'
import { Editor } from '@components/Wall/Editor'

import { getSession, useSession } from '@auth/client'

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const session = await getSession(context)

  if (session == null) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    }
  }

  return {
    props: { session },
  }
}

type Story = Pick<CommentProps, 'name' | 'imageUrl' | 'text'> & { id: string }

export default function WallPage() {
  const [session] = useSession()
  const [stories, setStories] = useState<Story[]>([])

  const addStory = (text: string) => {
    const message = text.trim()

    if (message.length < 1) {
      return
    }

    const newStory: Story = {
      id: new Date().getTime().toString(),
      name: session?.user?.name || '',
      imageUrl: session?.user?.image || '',
      text: message,
    }

    setStories((previousStories) => [newStory, ...previousStories])
  }

  if (session == null) {
    return <AccessDenied />
  }

  return (
    <Layout title="Wall">
      <div className="text-center pb-6">
        <Typography variant="h2">Wall</Typography>
        <div className="max-w-5xl mx-auto mb-6 mt-4">
          <Editor onSubmit={addStory} />
        </div>
      </div>
      <section className="">
        {stories.map(({ id, ...storyProps }) => (
          <Comment key={id} {...storyProps} />
        ))}
      </section>
    </Layout>
  )
}
