import { useState, useEffect } from "react";
function App() {
  const [data, setData] = useState([]);
  const [buttons, setButtons] = useState(0);
  const [page, setPage] = useState(1);


  useEffect(() => {
    getData();
  }, [page]);

  async function getData() {
    let res = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_limit=5&_page=${page}`
    );
    let finalData = await res.json();
    let count = Number(res.headers.get("X-Total-Count"));
    let pagesTot = Math.ceil(count / 5);
    setData(finalData);
    setButtons(pagesTot);
  }



  function handleMap(id) {
    let update2 = data.map((ele, index) => {
      if (id == index) {
        ele.title = "hey how are you";
        return ele;
      } else {
        return ele;
      }
    });
    setData(update2);
  }

  function handlePage(index) {
    setPage(index);
  }

  return (
    <>
      {data.map((ele, index) => {
        return (
          <div key={index} style={{ border: "1px solid black" }}>
            <p>{ele.title}</p>
            <button
              onClick={() => {
                handleMap(index);
              }}
            >
              Delete
            </button>
          </div>
        );
      })}

      {new Array(buttons).fill(0).map((ele, index) => {
        return (
          <button
            style={{ cursor: "pointer" }}
            onClick={() => {
              handlePage(index + 1);
            }}
            key={index}
          >
            {index + 1}
          </button>
        );
      })}
    </>
  );
}

export default App;
