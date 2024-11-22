import { useRouteError } from 'react-router-dom'

export default function ErrorPage(): JSX.Element {
  const error = useRouteError()
  console.error(error)

  return (
    <div id="error-page">
      <h1>Oops! Page Not Found</h1>
    </div>
  )
}
