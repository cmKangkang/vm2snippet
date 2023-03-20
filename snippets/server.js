const { createServer } = require('http')

const server = createServer(async (req, res) => {
  console.log("【snippet server】", req.method, req.url)
  if (req.url.startsWith('/helloworld')) {
    res.statusCode = 200
    res.write('hello world\n')
    return res.end('from snippet server')
  }

  res.end('this is snippet server')
})

server.listen(8098, () => {
  console.log("snippet server running on port 8098")
})

module.exports = server