import { Container } from "../../components/container";
import { CountDown } from "../../components/count-down";
import { MainForm } from "../../components/main-form";
import { MainTemplate } from "../../templates/main-template";

export function Home() {
  return (
    <>
      <MainTemplate>
        <Container>
          <CountDown />
        </Container>

        <Container>
          <MainForm />
        </Container>
      </MainTemplate>
    </>
  );
}
