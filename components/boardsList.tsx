import { useForm } from "react-hook-form";
import React, { useState } from "react";
import axios from "axios";
import BoardCard from "./Cards/boardCard";
import Spinner from "./spinner";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const BoardsTable = ({ userId, boards }: any) => {
  const { register, handleSubmit, reset } = useForm();
  const [boardsData, setBoards] = useState(boards);
  const [processing, setProcessing] = useState(false);

  const onSubmit = async ({ boardName, boardDescription }: any) => {
    if (!boardName || /^\s*$/.test(boardName)) {
      return;
    }
    setProcessing(true);
    const newBoard = {
      name: boardName,
      description: boardDescription,
      tasks: [],
      userId: userId,
    };
    const board = await axios({
      method: "post",
      url: "/api/boards/addBoard",
      data: {
        newBoard,
      },
    });
    setBoards([...boardsData, board.data]);
    setProcessing(false);
    reset();
  };

  const removeBoard = (board: any) => {
    const updatedBoards = boardsData.filter(
      (item: any) => item._id != board._id
    );
    setBoards(updatedBoards);
    axios({
      method: "post",
      url: "/api/boards/removeBoard",
      data: {
        id: board._id,
      },
    });
  };

  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="flex justify-center">
        <h1 className="font-semibold text-4xl text-cyan-500 text-center mt-5 md:mr-12 md:mt-0">
          My Boards
        </h1>
        <form
          className="flex"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Spinner
            display={processing}
            bgColour="text-white"
            fillColour="fill-cyan-500"
            classValue="pt-3"
          />
          <button
            className="text-white ri-add-line ri-2x hover:text-cyan-500"
            type="submit"
          ></button>
          <div className="flex flex-col md:flex-row">
            <input
              type="text"
              {...register("boardName")}
              className="text-white bg-black border-b-2 ml-4 form-control block w-44 md:w-60 px-4 py-2 text-lg bg-clip-padding transition ease-in-out m-0 focus:bg-black focus:border-cyan-500 focus:outline-none"
              placeholder={"Board name"}
            />

            <input
              type="text"
              {...register("boardDescription")}
              className="md:ml-12 border-b-2 ml-4 form-control block w-44 md:w-48 md:w-60 px-4 py-2 text-lg text-white bg-black bg-clip-padding transition ease-in-out m-0 focus:bg-black focus:border-cyan-500 focus:outline-none"
              placeholder={"Board description"}
            />
          </div>
        </form>
      </div>

      <div
        className={classNames(
          boardsData.length == 1
            ? "flex justify-center"
            : "md:grid md:grid-cols-2 place-items-center",
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
