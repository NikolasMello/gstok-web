import {createFileRoute} from "@tanstack/react-router";
import SignIn from "../features/login/components/SignIn";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  return <SignIn />;
}
