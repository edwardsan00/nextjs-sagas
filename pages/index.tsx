import Link from 'next/link'
import Layout from '../components/Layout'
import { useDispatch, useSelector } from 'react-redux'
import userDuck from 'reducers/user'
import { State } from 'reducers'
import { wrapper } from 'store/configStore.dev'

const { addCount, removeCount, addCountFromServer } = userDuck.creators

const IndexPage = () =>  {
  const dispatch = useDispatch()
  const { count, users, status  } = useSelector((state: State) => state.counter)
  console.log("IndexPage -> users", users)

  const handlerAdd = () => {
    dispatch(addCount())
  }

  const handlerLess = () => {
    dispatch(removeCount())
  }

  return (
    <Layout title="Home | Next.js + TypeScript Example">

      <h1>Hello Next.js 👋</h1>
        <button onClick={handlerAdd}>Agregar</button>
        <button onClick={handlerLess}>Restar</button>
        <p>{count}</p>
      {status === "READY" && users.map(({ id, name }) => (<p>{id} - {name}</p>))}
        <p>Hola</p>
      <p>
        <Link href="/about">
          <a>About</a>
        </Link>
      </p>
    </Layout>
  )
}
export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
  store.dispatch(addCountFromServer())
})

export default IndexPage
