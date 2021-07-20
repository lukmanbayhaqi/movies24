export const state = () => ({
  movieList: [],
  page: 1
});

export const mutations = {
  setPage(state) {
    state.page = state.page + 1;
  },
  setMovieList(state, payload) {
    state.movieList = [...state.movieList, ...payload];
  }
};

export const actions = {
  fetchMovies({ commit, state }) {
    return new Promise((resolve, reject) => {
      get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=5aeb53d2e95dd778417b0eda692a733e&language=en-US&page=${state.page}`
      )
        .then(({ data }) => {
          commit("setMovieList", data.results);
          resolve(data.results);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  loadMoreMovies({ commit, dispatch }) {
    commit("setPage");

    return new Promise((resolve, reject) => {
      dispatch("fetchMovies")
        .then(() => resolve(true))
        .catch(() => reject(false));
    });
  }
};
