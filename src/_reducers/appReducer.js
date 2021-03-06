import {
    ACTION_SET_PAGE, ACTION_SET_FILTERS, ACTION_SET_MODE, ACTION_SET_SEARCH_VALUE
} from "../_actions/_actionTypes";


const initialState = {
    page : 'shows',     // shows, movies
    mode : 'view',      // view, search
    search : '',
    filters : {
        period : 'week',       // week, day
        movies : 'trending',
        shows : 'trending'
    }
};

function appReducer(state = initialState, action) {
    switch (action.type) {
        case ACTION_SET_PAGE :
            return  { ...state,
                page: action.payload.page
            };
        case ACTION_SET_MODE :
            return  { ...state,
                mode: action.payload.mode,
                search: action.payload.mode === 'view' ? '' : state.search,
            };
        case ACTION_SET_SEARCH_VALUE :
            return  { ...state,
                search: action.payload.value,
            };
        case ACTION_SET_FILTERS :
            /*  TODO
             *  CURRENT: static update - it's working
             *  REFACTOR this to Iterator update for dynamically adding new filters
             */
            return  { ...state,
                filters : {
                    ...state.filters,
                    period : action.payload.filters.period !== undefined ?
                        action.payload.filters.period : state.filters.period,
                    movies : action.payload.filters.movies !== undefined ?
                        action.payload.filters.movies : state.filters.movies,
                    shows : action.payload.filters.shows !== undefined ?
                        action.payload.filters.shows : state.filters.shows,
                }
            };

        default : return state;
    }
}

export default appReducer;