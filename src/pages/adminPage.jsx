export function AdminPage() {
  return <div>ADMIN PAGE</div>;
}

function withLogProps(Component) {
  return (props) => {
    console.log(props);
    return Component;
  };
}

function withContainer(element) {
  // return a func of react comp
  return () => (
    <div>
      <div>withContainer</div>
      {element}
    </div>
  );
}

const Page = withLogProps(AdminPage);

export default withContainer(
  <div>
    <Page name="Ajmir" />
  </div>
);
