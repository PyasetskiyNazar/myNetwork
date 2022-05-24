import { Formik, Form, Field } from 'formik';
import { FilterType } from '../../reducers/usersReducer';
import classes from './UserSearchForm.module.css';
import React from 'react';
import { useSelector } from 'react-redux';
import { getUsersFilter } from './../../reducers/users-selectors';

type PropsType = {
  onFilterChanged: (filter: FilterType) => void
}

type FriendType = "null" | "true" | "false"
type FormSearchType = {
  term: string
  friend: FriendType
}

export const UserSearchForm: React.FC<PropsType> = React.memo((props) => {

  const filter = useSelector(getUsersFilter)

  const submit = (values: FormSearchType, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    const filter: FilterType = {
      term: values.term,
      friend: (values.friend === "null" ? null : values.friend === "true" ? true : false)
    }
    setSubmitting(false);
    props.onFilterChanged(filter)
  }

  return (
    <div>
      <h3>Search</h3>
      <Formik
        enableReinitialize
        initialValues={{ term: filter.term, friend: String(filter.friend) as FriendType}}
        onSubmit={submit}
      >
        {({ isSubmitting }) => (
          <div className={classes.formControl}>
            <Form>
              <Field type="text" name="term" />
              <Field name="friend" as="select">
                <option value="null">All</option>
                <option value="true">Only followed</option>
                <option value="false">Only unfollowed</option>
              </Field>
              <button type="submit" disabled={isSubmitting}>
                Search
              </button>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  )
})
