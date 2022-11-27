// import axios from "axios";
// import { useCallback, useEffect, useState } from "react";
// interface IDataGetter {
//     url:string,
//     method:'get' | 'post' | 'delete' | 'put' | 'patch',
//     isFetch:boolean,
//     config:null | Object
// }
// const useDataGetter = (url:string, method:string, isFetch = false, config = null) => {
//   const [state, setState] = useState({
//     data: [],
//     loading: false,
//     error: "",
//     request: false,
//   });

//   const axiosInstance = axios.create({
//     baseURL: "http://localhost:3000",
//   });

//   axiosInstance.interceptors.response.use((null), (error) => {
//     console.log(error?.response?.status);
//     const errors =
//       error.response &&
//       error.response.status >= 400 &&
//       error.response.status < 500;
//     if (!errors) {
//       console.log("The problem is the server");
//       setState({ ...state, error: "The problem is the server" });
//     }
//     return Promise.reject(error);
//   });

//   const fetch = useCallback(async () => {
//     setState({ ...state, loading: true });
//     try {
//       await axiosInstance
//         .get(`/${url}`, config)
//         .then((res) => {
//           // console.log(res.data);
//           setState({
//             ...state,
//             data: [...res.data],
//           });
//           // console.log(res.data);
//         })
//         .catch((error) => {
//           setState({
//             ...state,
//             data: [],
//             error: `error => ${error}`,
//           });
//         });
//     } catch (error) {
//       setState({
//         ...state,
//         data: [],
//         error: `error => ${error}`,
//       });
//     }
//   }, [axiosInstance, config, state, url]);

//   const fetchData = useCallback(
//     async (fetchData = null, id = null) => {
//       setState({ ...state, loading: true });
//       if (method === "get") {
//         try {
//           await axiosInstance[method](`/${url}`, config)
//             .then((res) => {
//               setState({
//                 ...state,
//                 data: res.data,
//                 loading: false,
//                 error: "",
//                 request: true,
//               });
//             })
//             .catch((error) => {
//               setState({
//                 ...state,
//                 data: [],
//                 loading: false,
//                 error: `error => ${error}`,
//                 request: false,
//               });
//             });
//         } catch (error) {
//           setState({
//             ...state,
//             data: [],
//             loading: false,
//             error: `error => ${error}`,
//             request: false,
//           });
//         }
//       }
//       if (method === "post") {
//         try {
//           await axiosInstance
//             .post("/posts", fetchData, config)
//             .then((res) => {
//               setState({
//                 data: [...state.data, res.data],
//                 loading: false,
//                 error: "",
//                 request: true,
//               });
//               // fetch();
//             })
//             .catch((error) => {
//               setState({
//                 ...state,
//                 loading: false,
//                 error: `error => ${error}`,
//                 request: false,
//               });
//             });
//         } catch (error) {
//           setState({
//             ...state,
//             loading: false,
//             error: `error => ${error}`,
//             request: false,
//           });
//         }
//       }
//       if (method === "delete") {
//         try {
//           await axiosInstance
//             .delete(`/posts/${id}`, config)
//             .then((res) => {
//               setState({
//                 data: state.data.filter((item) => item.id !== id),
//                 loading: false,
//                 error: "",
//                 request: true,
//               });
//             })
//             .catch((error) => {
//               setState({
//                 ...state,
//                 loading: false,
//                 error: `error => ${error}`,
//                 request: false,
//               });
//             });
//         } catch (error) {
//           setState({
//             ...state,
//             loading: false,
//             error: `error => ${error}`,
//             request: false,
//           });
//         }
//       }
//       if (method === "put") {
//         try {
//           await axiosInstance
//             .put(`/posts/${id}`, fetchData, config)
//             .then((res) => {
//               // console.log(res);
//               const newData = state.data.map((item) => {
//                 if (item.id === id) {
//                   console.log([...state.data, { fetchData }]);
//                   return [...state.data, { fetchData }];
//                 }
//               });
//               setState({
//                 data: newData,
//                 loading: false,
//                 error: "",
//                 request: true,
//               });
//             })
//             .catch((error) => {
//               setState({
//                 ...state,
//                 loading: false,
//                 error: `error => ${error}`,
//                 request: false,
//               });
//             });
//         } catch (error) {
//           setState({
//             ...state,
//             loading: false,
//             error: `error => ${error}`,
//             request: false,
//           });
//         }
//       }
//     },
//     [axiosInstance, config, method, state, url]
//   );
//   useEffect(() => {
//     if (isFetch) {
//       fetch();
//     }
//   }, [fetch, isFetch]);

//   const { error, loading, data, request } = state;

//   return {
//     error,
//     loading,
//     data,
//     request,
//     fetchData,
//     fetch,
//   };
// };
// export default useDataGetter;

import { AxiosRequestHeaders, AxiosResponse } from "axios";
import { useCallback, useEffect, useReducer, useState } from "react";
import {axiosConfig} from "./../services/httpService";
type IMethod = "get" | "post" | "delete" | "put" | "patch";
interface IState<D, E> {
  data: D;
  loading: boolean;
  error: E;
}

const SET_LOADING = "SET_LOADING";
const GET_DATA = "GET_DATA";
const GET_ERROR = "GET_ERROR";

interface ISetLoadingAction {
  type: typeof SET_LOADING;
}
interface IGetDataAction {
  type: typeof GET_DATA;
  payload: Object;
}
interface ISetErrorAction {
  type: typeof GET_ERROR;
  payload: Object;
}
type ListAction = ISetLoadingAction | IGetDataAction | ISetErrorAction;

const initialState: IState<any, any> = {
  data: null,
  loading: false,
  error: null,
};

const reducer = (state: IState<any, any>, action: ListAction) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_DATA:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case GET_ERROR:
      return {
        ...state,
        loading: false,
        data: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

function useDataGetter<D>(
  url: string,
  method: IMethod = "get",
  isFetch: boolean = false,
  data?: D,
  params?: Object | null,
  success?: (res?: AxiosResponse<any, any>) => void,
  fail?: (error?: unknown) => void
) {
  //   const [state, dispatch] = useReducer<any>(reducer, initialState);
  // const [state, setState] = useState<any>({
  //   data: null,
  //   loading: false,
  //   error: null,
  // });
  const [_data, _setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>();
  const dataGetter = useCallback(
    async (d?: any) => {
      setLoading(true);
      try {
        await axiosConfig.axiosProtected({
          method,
          url,
          data: d,
          params,
        }).then((res) => {
          // setState({ ...state, loading: false, data: res.data });
          setLoading(false);
          _setData(res.data);
          success && success(res);
        });
      } catch (error) {
        console.log(error);
        // setState({ ...state, loading: false, data: null, error });
        setError(error);
        fail && fail(error);
      }
    },
    [fail, method, params, success, url]
  );

  useEffect(() => {
    if (isFetch) {
      new Promise(() => {
        dataGetter(data);
      });
    }
  }, [data, dataGetter, isFetch]);
  return {
    data: _data,
    loading: loading,
    error: error,
    fetch: dataGetter,
  };
}

export default useDataGetter;
