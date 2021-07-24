export async function getStaticProps() {
  const teacher = await fetch("http://localhost:4200/teacher");
  let data = await teacher.json();
  return {
    props: {
      data,
    },
  };
}

export const teacherProfile = (props) => {
  console.log(props, "log for mee ");
  return <>kimotchiiiiiiiii</>;
};
