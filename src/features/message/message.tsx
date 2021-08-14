export function Message(props: any) {
    return (
        <div>
            <div>Oops! something went wrong</div>
            <div>{props.data}</div>
        </div>
    );
}
