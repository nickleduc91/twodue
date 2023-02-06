import Header from "../../components/header";
import BoardsTable from "../../components/boardsList";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";

const BoardsPage = ({ user, boards }) => {
  return (
    <div>
      <Header />
      <BoardsTable user={user} boards={boards} />
    </div>
  );
};

export async function getServerSideProps(context) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  const user = await fetch(
    `http://localhost:3000/api/users?username=${session.user.username}`
  );
  const userData = await user.json();

  //fetch for boards based off ids
  const boards = await fetch(
    `http://localhost:3000/api/boards?userId=${userData.data._id}`
  );
  const boardsData = await boards.json();

  return {
    props: {
      user: userData.data,
      boards: boardsData.data,
    },
  };
}

export default BoardsPage;
