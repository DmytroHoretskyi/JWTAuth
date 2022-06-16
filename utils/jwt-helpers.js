import jwt from 'jsonwebtoken';

function jwtTokens({ name, email }) {
  const user = { name, email};
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5m' });
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '15m' });
  return ({ accessToken, refreshToken });
}

export default jwtTokens;
