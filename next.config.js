/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'image.jpeg',
      'i.pinimg.com',
      'butwhytho.net',
      "lh3.googleusercontent.com",
      "i.redd.it",
      "preview.redd.it"
    ]
  }
}

module.exports = nextConfig
