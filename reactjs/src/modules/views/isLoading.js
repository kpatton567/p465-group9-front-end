export default function isLoading() {
    return (
        <div>
            Your page is loading
            <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={4}>
                    <img
                        alt="..."
                        src={work4}
                        className={navImageClasses}
                    />
                    <img
                        alt="..."
                        src={studio3}
                        className={navImageClasses}
                    />
                </GridItem>
            </GridContainer>
        </div>
    )
}