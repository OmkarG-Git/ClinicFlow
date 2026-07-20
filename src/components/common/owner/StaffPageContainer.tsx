
export function StaffPageContainer() {

    return (
        <div>
            <DataTableToolbar
                search={search}
                onSearch={setSearch}
                searchPlaceholder="Search patients..."
                leftContent={
                    <>
                        <GenderFilter />
                        <StatusFilter />
                    </>
                }
                rightContent={
                    <Button>
                        Add Patient
                    </Button>
                }
            />

            <DataTable
                columns={patientColumns}
                data={patients.data}
                loading={loading}
                pagination={patients.pagination}
                onPageChange={handlePageChange}
            />
        </div>
    )
}