import { forwardRef, useImperativeHandle, useState } from "react"
import PropTypes from "prop-types"

const Togglable = forwardRef((props, refs) => {
  const [visiable, setVisable] = useState(false)

  const toggleVisible = () => setVisable(!visiable)
  const hiddenChildren = { display: visiable ? "none" : "" }
  const displayChildren = { display: visiable ? "" : "none" }

  useImperativeHandle(refs, () => {
    return { toggleVisible }
  })

  return (
    <div>
      <div style={displayChildren} className="togglable-cont">
        {props.children}
        <button onClick={() => toggleVisible()}>cancel</button>
      </div>
      <div style={hiddenChildren}>
        <button id="toggle-btn" onClick={() => toggleVisible()}>{props.info}</button>
      </div>
    </div>
  )
})

Togglable.propTypes = {
  info: PropTypes.string.isRequired,
}
Togglable.displayName = "Togglable"
export default Togglable
