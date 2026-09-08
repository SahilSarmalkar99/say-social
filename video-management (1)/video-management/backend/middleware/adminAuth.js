export default function adminAuth(req, res, next) {
  const configured = process.env.ADMIN_API_KEY;
  if (!configured) return next();
  const key = req.header('x-admin-key');
  if (!key || key !== configured) return res.status(401).json({ message: 'Admin authentication required' });
  next();
}
