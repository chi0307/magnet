import { useRouteError } from 'react-router'

import { errorHandle } from './utils'

export default function ErrorPage(): JSX.Element {
  const error = useRouteError()
  errorHandle('is error page', { error })

  return (
    <div id="error-page">
      <h1>Oops! Page Not Found</h1>
    </div>
  )
}
