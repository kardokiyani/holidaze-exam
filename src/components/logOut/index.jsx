import { Button, Container } from "react-bootstrap";

export function HandleTheLogout() {
  const handleTheLogout = () => {
    localStorage.removeItem("accessToken");
    window.location.href = "/signIn";
  };

  return (
    <Container>
      <Button variant="primary" onClick={handleTheLogout} aria-label="Logout">
        Logout
      </Button>
    </Container>
  );
}

export default HandleTheLogout;
