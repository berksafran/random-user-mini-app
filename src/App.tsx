import Container from "./components/Container";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import UserCard from "./components/UserCard/UserCard";

const App = () => {
  return (
    <ErrorBoundary>
      <Container>
        <UserCard />
      </Container>
    </ErrorBoundary>
  );
};

export default App;
