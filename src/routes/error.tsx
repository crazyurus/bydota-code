import { useRouteError } from '@modern-js/runtime/router';

function ErrorBoundary(): JSX.Element {
  const error: any = useRouteError();

  return (
    <div>
      <div>不支持当前浏览器，请使用其他浏览器打开</div>
      <div>错误信息：{error.message}</div>
      <div>浏览器信息：{navigator.userAgent}</div>
    </div>
  );
}

export default ErrorBoundary;
