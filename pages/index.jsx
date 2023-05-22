import Feed from "@components/Feed";

const Home = () => {
    return (
        <section className="w-full flex-center flex-col">
            <h1 className="head_text text-center">
                Discover & Share
                <br />
                <span className="blue_gradient text-center"> World of Words</span>
            </h1>
            <p className="desc text-center">
                Unlock the Power of Language with Advanced English Dictionary
            </p>

            <Feed />
        </section>
    );
};

export default Home;
