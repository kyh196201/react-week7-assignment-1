export default function LoginForm({ onSubmit }) {
  return (
    <div>
      <div>
        <label htmlFor="login-email">E-mail</label>
        <input id="login-email" type="text" name="E-mail" />
      </div>
      <div>
        <label htmlFor="login-password">Password</label>
        <input id="login-password" type="password" name="password" />
      </div>
      <div>
        <button type="button" onClick={onSubmit}>Log In</button>
      </div>
    </div>
  );
}
