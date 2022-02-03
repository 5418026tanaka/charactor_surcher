import { useEffect, useState } from "react";
import { fetchImages } from "./api";

function Header() {
  return (
    <header className="hero is-success">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">キャラクターサーチャー</h1>
          <h2>学籍番号：5418026 名前：田中柊羽</h2>
        </div>
      </div>
    </header>
  );
}

function Image(props) {
  return (
    <div className="media">
      <div className="media-left">
        <figure className="image">
        <img src={props.src} alt="today's dinner" />
        </figure>
      </div>
    </div>
  );
}

function Loading() {
  return <p>Loading...</p>;
}


function Gallery(props) {
  const { url } = props;
  if (url == null) {
    return <Loading />;
  }
  return (
    <div className="columns is-vcentered is-multiline">
      <div className="column is-3">
        <Image src={ url } />
      </div>
    </div>
  );
}

function Form(props) {
  function handleSubmit(event) {
    event.preventDefault();
    const { chara } = event.target.elements;
    props.onFormSubmit(chara.value);
  }
  return (
    <div>
     <form onSubmit={handleSubmit}>
        <div className="field has-addons">
          <div className="control is-expanded">
            <div className="select is-fullwidth">
              <select name="chara" defaultValue="rice">
                <option value="mario">マリオ</option>
                <option value="pikachu">ピカチュウ</option>
                <option value="kirby">カービィ</option>
                <option value="Donkey Kong">ドンキーコング</option>
                <option value="Diddy Kong">ディーディーコング</option>
                <option value="Link">リンク</option>
                <option value="Zelda">ゼルダ</option>
                <option value="Luigi">ルイージ</option>
                <option value="Peach">ピーチ</option>
                <option value="Yoshi">ヨッシー</option>
                <option value="Rosalina">ロゼッタ</option>
                <option value="Goomba">クリボー</option>
                <option value="Bowser">クッパ</option>
              </select>
            </div>
          </div>
          <div className="control">
            <button type="submit" className="button is-dark">
              Reload
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}


function Main() {
 const [url, setUrls] = useState(null);
  useEffect(() => {
    fetchImages("mario").then((url) => {
      setUrls(url);
    });
  },[]);
  function reloadImages(breed) {
    fetchImages(breed).then((urls) => {
      setUrls(urls);
    });
  }
  return (
    <main>
      <section className="section">
        <div className="container">
        <Form onFormSubmit={reloadImages} />
        </div>
      </section>
      <section className="section">
        <div className="container">
        <p>
          選択したキャラクターのAmiiboの画像を表示します．
        </p>
        <p>
          画像は全て任天堂HPから引用しています．
          また，APIはAmiiboAPIのものをお借りしています.
        </p>  
        <p>
          各リンクはフッターに記載しています
        </p>
        <Gallery url={url} /> 
        </div>
      </section>
    </main>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="content has-text-centered">

        <p>
          <a href="https://www.nintendo.co.jp/hardware/amiibo/index.html#touch"> 任天堂公式HP(Amiibo）</a>
        </p>
        <p>
          <a href="https://amiiboapi.com/"> AmiiboAPI</a>
        </p>
      </div>
    </footer>
  );
}

function App() {
  return (
    <div>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;