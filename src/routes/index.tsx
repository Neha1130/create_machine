import { PAGE_PATH } from "./Pagepath";
import { RouterPath } from "./RouterPath";

export const GetRoutes = (token?: string | null | undefined) => {
  if (!!token) {
    return RouterPath.filter((data: any) => {
      if (data.token) {
        return data;
      }
      return false;
    });
  } else {
    return RouterPath.filter((data: any) => {
      if (!data.token) {
        return data;
      }
      return false;
    });
  }
};

const PathChecker = (currentPath: string, routerpath: string) => {
  return routerpath.split("/").every((path, index) => {
    if (path === "") {
      return true;
    } else if (path.includes(":")) {
      return true;
    }
    return currentPath.split("/")[index] === path;
  });
};
export const DynamicePathAuth = (path: string, token?:string | null) => {
  if (PathChecker(path, PAGE_PATH.userVerification) && !token) {
    return true;
  }
  return false;
};
