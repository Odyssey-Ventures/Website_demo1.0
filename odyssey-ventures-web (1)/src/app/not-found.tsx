import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container className="py-28">
      <h1 className="font-semibold tracking-tight text-5xl tracking-tight">Page not found</h1>
      <p className="mt-4 max-w-md text-lg text-muted">
        The page you are looking for does not exist or has moved.
      </p>
      <Button href="/" className="mt-8">
        Back to home
      </Button>
    </Container>
  );
}
