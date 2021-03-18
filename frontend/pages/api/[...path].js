import httpProxy from 'http-proxy'
import Cookies from 'cookies'
import url from 'url'

// Get the actual API_URL as an environment variable. For real
// applications, you might want to get it from 'next/config' instead.
const API_URL = 'http://localhost:4000'

const proxy = httpProxy.createProxyServer()

export const config = {
	api: {
		bodyParser: false,
	},
}

export default (req, res) => {
	return new Promise((resolve, reject) => {
		const pathname = url.parse(req.url).pathname
		const isLogin = pathname === '/api/login'

		const cookies = new Cookies(req, res)
		const authToken = cookies.get('token')

		// Rewrite URL, strip out leading '/api'
		// '/api/proxy/*' becomes '${API_URL}/*'
		req.url = req.url.replace(/^\/api/, '')

		// Don't forward cookies to API
		req.headers.cookie = ''

		// Set auth-token header from cookie
		if (authToken) {
			req.headers['token'] = authToken
		}

		proxy
			.once('proxyRes', (proxyRes, req, res) => {
				if (isLogin) {
					let responseBody = ''
					proxyRes.on('data', (chunk) => {
						responseBody += chunk
					})

					proxyRes.on('end', () => {
						try {
							const { authToken } = JSON.parse(responseBody)
							const cookies = new Cookies(req, res)
							cookies.set('token', authToken, {
								httpOnly: true,
								sameSite: 'lax', // CSRF protection
							})

							res.status(200).json({ loggedIn: true })
							resolve()
						} catch (err) {
							reject(err)
						}
					})
				} else {
					resolve()
				}
			})
			.once('error', reject)
			.web(req, res, {
				target: API_URL,
				autoRewrite: false,
				selfHandleResponse: isLogin,
			})
	})
}
