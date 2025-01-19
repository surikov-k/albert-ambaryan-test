import LoginForm from "./auth/login-form";

export function App() {
  return (
    <section className="w-full">
      <div className="flex h-screen items-center justify-center">
        <LoginForm />
      </div>
    </section>
  );
}

export default App;
