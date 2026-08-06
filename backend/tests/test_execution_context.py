from core.runtime import ExecutionContext



def test_context_storage():


    context = ExecutionContext(

        task_id="1",

        goal="Test goal"

    )


    context.add_result(

        "First result"

    )


    assert len(
        context.previous_results
    ) == 1


    assert (
        context.previous_results[0]
        ==
        "First result"
    )