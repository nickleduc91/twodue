import { useForm } from "react-hook-form";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import BoardCard from "./Cards/boardCard";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const BoardsTable = ({ user, boards }: any) => {
  const { register, handleSubmit, reset } = useForm();
  const [boardsData, setBoards] = useState(boards);
  const router = useRouter();

  const onSubmit = ({ boardName, boardDescription }: any) => {
    if (!boardName || /^\s*$/.test(boardName)) {
      return;
    }
    const newBoard = {
      name: boardName,
      description: boardDescription,
      tasks: [],
      userId: user._id,
    };
    setBoards([...boardsData, newBoard]);
    axios({
      method: "post",
      url: "/api/boards/addBoard",
      data: {
        newBoard,
      },
    });
    router.reload();
    reset();
  };

  const removeBoard = (board: any) => {
    const updatedBoards = boardsData.filter(
      (item: any) => item._id != board._id
    );
    axios({
      method: "post",
      url: "/api/boards/removeBoard",
      data: {
        id: board._id,
      },
    });
    setBoards(updatedBoards);
  };

  const getCompletedCount = (board: any) => {
    let completed = 0;
    board.tasks.map((task: any) => {
      if (task.completed) {
        completed++;
      }
    });
    return completed;
  };

  return (
    <div className="mx-auto w-full max-w-5xl bg-white">
      <div className="flex justify-center pt-12 pb-12">
        <h1 className="font-semibold text-4xl text-cyan-500 text-center mr-12">
          My Boards
        </h1>
        <form
          className="sm:pl-4  flex sm:items-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <button
            className="ri-add-line ri-2x hover:text-cyan-500"
            type="submit"
          ></button>
          <input
            type="text"
            {...register("boardName")}
            className="border-b-2 ml-4 form-control block w-60 px-4 py-2 text-lg bg-white bg-clip-padding transition ease-in-out m-0 focus:bg-white focus:border-cyan-500 focus:outline-none"
            placeholder={"Board name"}
          />

          <input
            type="text"
            {...register("boardDescription")}
            className="ml-12 border-b-2 ml-4 form-control block w-60 px-4 py-2 text-lg bg-white bg-clip-padding transition ease-in-out m-0 focus:bg-white focus:border-cyan-500 focus:outline-none"
            placeholder={"Board description"}
          />
        </form>
      </div>

      <div
        className={classNames(
          boardsData.length == 1
            ? "flex justify-center"
            : "grid grid-cols-2 place-items-center",
          "pt-12"
        )}
      >
        {boardsData.map((board: any, index: any) => (
          <BoardCard
            key={index}
            board={board}
            handleRemoveBoard={removeBoard}
          />
        ))}
      </div>
    </div>
  );
};

export default BoardsTable;
