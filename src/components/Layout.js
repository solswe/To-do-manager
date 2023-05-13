import Nav from './Nav';
import Head from 'next/head';

const Layout = ({children}) => {
    return (
        <>  
            <Head>
                <title>My To-do</title>
            </Head>
            <div className="columns">
                <div className="column has-background-danger-light is-one-quarter">
                    <section className='section'>
                        <Nav />
                    </section>
                </div>
                <div className="column">            
                    <section className="section">
                        {children}
                    </section>
                </div>
            </div>
        </>
    )
}

export default Layout