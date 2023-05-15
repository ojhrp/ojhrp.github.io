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
          <h1>
            <a name="top"> 오지혜 교수님 애정합니다😍</a>
          </h1>
          <h2>SSAFY 9기 서울 8반 일동</h2>
          <div>
            <button type="button" onClick={handleClick}>
              SHUFFLE
            </button>
          </div>
        </Nav>
        <Main>
          <ListWrapper>
            {list.map((comment) => {
              return (
                <List key={comment[0]}>
                  <div>
                    <h2>{comment[1]}</h2>
                    <h3>
                      <span>
                        {comment[3] ? comment[3] + "(?)" : comment[2]}
                      </span>
                    </h3>
                  </div>
                </List>
              );
            })}
          </ListWrapper>
        </Main>
        <Footer>
          <p>이 롤링페이퍼는 승윤이가 ♥︎을 담아 만들었습니다.</p>
          <p>
            <a href="#top">위로 올라가기</a>
          </p>
        </Footer>
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
  padding: 3rem 0 3rem 0;
  text-align: center;
  h1 {
    font-size: 3rem;
    color: #fc0362;
  }
  button {
    cursor: pointer;
    font-size: 1.25rem;
    margin-top: 1rem;
    padding: 0.5rem 1.25rem 0.5rem 1.25rem;
    background-color: #444;
    border: none;
    border-radius: 2rem;
    color: white;
    font-weight: 700;
  }
  button:hover {
    background-color: #fc0362;
  }
  button:active {
    opacity: 0.75;
  }
  @media screen and (max-width: 40rem) {
    h1 {
      font-size: 2rem;
    }
    h2 {
      font-size: 1.25rem;
    }
    button {
      font-size: 1rem;
      padding: 0.5rem 1rem 0.5rem 1rem;
    }
  }
`;
const Main = styled.div`
  padding: 1rem 3rem 3rem 3rem;
`;
const ListWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const List = styled.article`
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 1rem;
  width: calc(100% - 2rem);
  max-width: 40rem;
  margin: 1rem;
  h2 {
    font-size: 1.35rem;
    line-height: 165%;
  }
  h3 {
    font-size: 1.15rem;
    margin-top: 1rem;
    font-weight: 400;
  }
  h3 span {
    font-weight: 700;
    color: #fc0362;
  }
  @media screen and (max-width: 40rem) {
    h2 {
      font-size: 1.15rem;
    }
    h3 {
      font-size: 1rem;
    }
  }
`;
const Footer = styled.footer`
  margin: 2rem 1rem 15rem 1rem;
  text-align: center;
  p {
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }
`;
export default App;
