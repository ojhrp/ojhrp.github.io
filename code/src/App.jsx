import { useEffect, useState } from "react";
import styled from "styled-components";

function App() {
  const [list, setList] = useState([]);

  const shuffle = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  };

  useEffect(() => {
    let temp;
    const fetchList = async () => {
      const data = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${process.env.REACT_APP_SHEET_ID}/values/1?key=${process.env.REACT_APP_API_KEY}`
      )
        .then((res) => res.json())
        .catch((err) => (temp = ["리스트를 가져오는 데 실패했습니다."]));
      temp = [...data.values.slice(1)];
      shuffle(temp);
      setList(temp);
    };
    fetchList();
  }, []);
  //랜덤

  const handleClick = () => {
    let temp = [...list];
    shuffle(temp);
    setList(temp);
  };

  return (
    { list } && (
      <Container>
        <Nav>
          <h1>오지혜 교수님 애정합니다</h1>
          <h2>SSAFY 9기 서울 8반 일동</h2>
          <button type="button" onClick={handleClick}>
            SHUFFLE
          </button>
        </Nav>
        <Main>
          <ListWrapper>
            {list.map((comment) => {
              return (
                <List key={comment[0]}>
                  <div>
                    <h2>{comment[1]}</h2>
                    <h3>
                      {comment[3].trim().length > 0
                        ? comment[3] + "(?)"
                        : comment[2]}
                    </h3>
                  </div>
                </List>
              );
            })}
          </ListWrapper>
        </Main>
      </Container>
    )
  );
}

const Container = styled.main`
  cursor: default;
  font-family: "Work Sans", "Noto Sans KR", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;
const Nav = styled.nav`
  padding: 2rem 0 0 4rem;
  h1 {
    font-size: 3rem;
  }
  button {
    margin-top: 1rem;
    padding: 0.35rem 0.5rem 0.35rem 0.5rem;
    background-color: #333;
    border: none;
    border-radius: 0.25rem;
    color: white;
    font-weight: 700;
  }
`;
const Main = styled.div`
  padding: 1rem 3rem 3rem 3rem;
`;
const ListWrapper = styled.section`
  display: flex;
  flex-direction: column;
`;
const List = styled.article`
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  width: calc(100% - 2rem);
  margin: 1rem;
  h2 {
    font-size: 1.75rem;
  }
  h3 {
    font-size: 1.25rem;
    font-weight: 400;
  }
`;

export default App;
