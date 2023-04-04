import sendQuery from "../ipc/sendQuery";
import Ifrender from "../components/Ifrender";
import Loading from "../components/Loading";
import ProfileList from "../sections/ProfileList";
import { useEffect, useState } from "react";

export default function Home(): JSX.Element {
    const [query, setQuery] = useState({
        name: "",
        page: 1,
    });
    const { data, pending, fn } = sendQuery(
        "get_profiles",
        { ...query },
        {
            activeOnInitial: true,
            onSuccess(data) {
                console.log(data);
            },
        }
    );

    useEffect(() => {
        if (query.name !== null) {
            fn({ ...query, page: 1 });
        } else {
            fn({ page: 1, name: "" });
        }
    }, [query.name]);

    useEffect(() => {
        if (query.page) {
            fn({ ...query });
        }
    }, [query.page]);

    return (
        <Ifrender condition={data === null && pending}>
            <Loading
                style={{
                    width: "100%",
                    minHeight: "450px",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            />
            <ProfileList
                query={query}
                onRefresh={() =>
                    fn({
                        name: "",
                        page: 1,
                    })
                }
                onChangeQuery={setQuery}
                data={data}
            />
        </Ifrender>
    );
}
