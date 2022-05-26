/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    MYSQL_HOST: "127.0.0.1",
    MYSQL_PORT: "3306",
    MYSQL_DATABASE: "the_mobile_hour",
    MYSQL_USER: "kiyo",
    MYSQL_PASSWORD: "a1b2c3d4e5A",
    SECRET: "jose newkey -s 512 -t oct -a HS512"
  }
}

module.exports = nextConfig
