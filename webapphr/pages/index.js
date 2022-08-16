import Head from "next/head";

export default function Home() {
    return (
        <div>
            <Head>
                <title>POC IAM Automatisation</title>
                <meta name="description" content="" />
            </Head>

            <main>
                <div>
                    <div className="row">
                        <div className="col centerText">
                            <h3>Systeme RH</h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col centerItem">
                            <form method="post" action="/">
                                <div className="row">
                                    <div className="col">
                                        <p>Name</p>
                                        <input type="text" name="name" required />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <p>email</p>
                                        <input type="text" name="name" required />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}