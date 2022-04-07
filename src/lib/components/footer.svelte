<footer>
  <div>
    🍿️ powered by
    <img
      alt="tmdb logo"
      src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_long_2-9665a76b1ae401a510ec1e0ca40ddcb3b0cfe45f1d51b77a308fea0845885648.svg"
    />
  </div>
</footer>

<style lang="scss">
  footer {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    width: 100%;
    background: rgb(var(--tmdbDarkBlue));
    height: 120px;
    color: rgba(var(--white), 0.8);
  }

  div {
    display: flex;
    align-items: center;
    height: 60px;
  }

  img {
    width: 140px;
    margin-left: 12px;
    opacity: 0.8;
  }
</style>
