import { NextApiHandler } from 'next'

const credentialsAuth: NextApiHandler<User> = (request, response) => {
  if (request.method !== 'POST') {
    response.status(405).end()
  }

  if (request.body.password === process.env.AUTH_MIAMISTORE_SECRET) {
    // How about using another API to randomly generate user's and avatars? :)
    const user: User = {
      name: 'Usuario',
      email: 'test@tiendamia.com',
      image: '',
    }
    return response.status(200).json(user)
  }
  // Auth failed
  response.status(401).end()
}

export default credentialsAuth
