import React, { useState } from 'react'
import styles from './index.module.scss'
import { countryStore } from '../../services/countryService'
import { useDispatch, useSelector } from 'react-redux'
import { countryActions } from '../../store/countrySlice'
import { Link, useNavigate } from 'react-router-dom'

function CreateCountry() {
  const [name, setName] = useState(null)
  const [errors, setErrors] = useState({
    name: null,
  })
  const token = useSelector(state => state.auth.token)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const createCountry = async e => {
    e.preventDefault()
    try {
      const response = await countryStore(token, {
        name: name,
      })
      dispatch(countryActions.addCountry(response))
      navigate('/select-country')
    } catch (error) {
      if (error.response.data) {
        let errors = error.response.data.errors

        setErrors({
          name: errors.name,
        })
      }
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.holder}>
        <div className={styles.closeButtonHolder}>
          <Link to={'/select-country'} className={styles.closeButton}>
            ✖
          </Link>
        </div>
        <form onSubmit={e => createCountry(e)} className={styles.form}>
          <div className={styles.form__title}>Creating country</div>
          <div className={styles.form__group}>
            <div className={styles.form__inputGroup}>
              <input
                required
                type="text"
                onChange={e => setName(e.target.value)}
                placeholder=""
                className={styles.form__input}
              />
              <label className={styles.form__label}>Name</label>
            </div>
            {errors.name && (
              <ul className={styles.form__errorList}>
                {errors.name.map((item, index) => (
                  <li key={index} className={styles.form__error}>
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className={styles.form__buttonContainer}>
            <div className={styles.form__buttonHolder}>
              <button type="submit" className={styles.form__button}>
                Create
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateCountry
