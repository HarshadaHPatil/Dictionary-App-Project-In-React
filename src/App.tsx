import { useState } from "react";

import { useEffect } from "react";

function App() {

  const [search, setSearch] = useState("");  //search stores value(current state), setSearch updates it (updated state), and useState   connects it to React UI

  //useState state store karto ani state change zali ki React re-render karto (UI update hota)

  const [result, setResult] = useState<any>(null);

  //useState is used to store state, and when the state changes, React automatically re-renders the UI to reflect the new state.

  //fetch api
  // function handleSearch() {
  //   // console.log(search);
  //   fetch(
  //     `https://www.dictionaryapi.com/api/v3/references/sd4/json/${search}?key=a575fefe-7293-4484-84f9-584d31e452cc`
  //   )
  //     .then((response) => response.json())
  //     // .then((data) => {
  //     //   // console.log(data);
  //     //   setResult(data[0]);
  //     // })
  //     // .catch((error) => {
  //     //   setResult(null)
  //     //   console.log("Error:", error);
  //     // });

  //     .then((data) => {
  //       if (data.length > 0 && typeof data[0] === "object") {
  //         setResult(data[0]);
  //       } else {
  //         setResult(null);
  //       }
  //     })
  // }

  // useEffect(() => {
  //   if (search.trim() === "") {
  //     setResult(null);
  //     return;
  //   }
  //   fetch(`https://www.dictionaryapi.com/api/v3/references/sd4/json/${search}?key=a575fefe-7293-4484-84f9-584d31e452cc`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (data.length > 0 && typeof data[0] === "object") {
  //         setResult(data[0]);
  //       } else {
  //         setResult(null);
  //       }
  //     });
  // }, [search]);



  // auto search
  // useEffect(() => {
  //   if (search.trim() === "") {
  //     setResult(null);
  //     return;
  //   }

  //   const timer = setTimeout(() => {
  //     fetch(`https://www.dictionaryapi.com/api/v3/references/sd4/json/${search}?key=a575fefe-7293-4484-84f9-584d31e452cc`)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         if (data.length > 0 && typeof data[0] === "object") {
  //           setResult(data[0]);
  //         } else {
  //           setResult(null);
  //         }
  //       });
  //   }, 500); // delay (ms)

  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, [search]);


  // API CALL FUNCTION
  const handleSearch = () => {
    if (search.trim() === "") {
      setResult(null);
      return;
    }

    fetch(
      `https://www.dictionaryapi.com/api/v3/references/sd4/json/${search}?key=a575fefe-7293-4484-84f9-584d31e452cc`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0 && typeof data[0] === "object") {
          setResult(data[0]);
        } else {
          setResult(null);
        }
      })
      .catch((error) => {
        console.log("Error:", error);
        setResult(null);
      });
  };

  // ENTER KEY
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // React.KeyboardEvent<...>: This is a keyboard event coming from React

  //(e: React.KeyboardEvent<HTMLInputElement>): e is a keyboard event coming from an input box, and TypeScript should treat it that way


  // React.KeyboardEvent
  // This tells TypeScript:
    // 👉 “This is a keyboard event (key press, key down, etc.) in React”
// 3. <HTMLInputElement>
// This tells:
// 👉 “The event happened on an <input> element

  //useEffect is used to perform side effects after rendering, and it can run again when state or props change.

  //useEffect rendering नंतर side effects perform करायला वापरलं जातं आणि dependency (state or props) बदलली की पुन्हा run होतं


  return (
    <div>
      <h1 className="flex justify-center m-5 text-center text-5xl bg-blue-500 p-5 text-white rounded">Dictionary App</h1>

      <div className="flex justify-center gap-4">

        <input className="border border-gray-300 px-4 py-2 rounded-lg"
          placeholder="Search your word here"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <button className="bg-blue-500 text-white p-5 rounded-lg" onClick={handleSearch}>Search</button>

      </div>

      {/* <div>
        result will be displayed here
      </div> */}

      <div className="justify-center text-center m-5 text-2xl">
        {result ? (
          <div>
            <h2 className="m-5 font-semibold">{result.meta.id}</h2>
            <p className="m-5 font-semibold">Pronunciation: {result.hwi.prs?.[0]?.mw}</p>
            <p className="m-5 font-semibold">Meaning: {result.shortdef?.[0]}</p>
            {/* <p>part of speech: {result.fl}</p> */}
          </div>
        ) : (

          <p>Search a word to see result</p>
        )}
      </div>
    </div>
  );
}

export default App;