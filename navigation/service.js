import { CommonActions, StackActions } from '@react-navigation/native'

let _navigator

function setTopLevelNavigator (navigatorRef) {
    _navigator = navigatorRef
}

function navigate (routeName, params, user = null) {
    _navigator.dispatch(
        CommonActions.navigate({
            name: routeName,
            params
        })
    )
}

function getCurrentRoute () {
    if (_navigator !== undefined && _navigator !== null) { return _navigator.getCurrentRoute().name } else return null
}

function authNavigate (routeName, params, user = null) {
    const resetAction = CommonActions.reset({
        index: 0,
        routes: [
            {
                name: routeName,
                params
            }
        ]
    })

    _navigator.dispatch(resetAction)
}

function push (routeName, params) {
    _navigator.dispatch(
        StackActions.push({
            routeName,
            params
        })
    )
}

function nestedNavigate (routeName, params, user = null) {
    mixpanelinstance.then(() => {
        mixpanel.track('Change Screen', {
            screen_name: routeName,
            user_id: user ? user.user_id : 'null',
            signed_in: !!user
        })
    })
    Promise.all([
        _navigator.dispatch(
            CommonActions.navigate({
                name: 'Main Menu',
                params
            })
        )
    ]).then(() =>
        _navigator.dispatch(
            CommonActions.navigate({
                name: routeName,
                params
            })
        )
    )
}

function back () {
    if (_navigator.canGoBack()) {
        _navigator.dispatch(CommonActions.goBack())
    } else {
        const resetAction = CommonActions.reset({
            index: 0,
            routes: [
                {
                    name: 'Register Option'
                }
            ]
        })

        _navigator.dispatch(resetAction)
    }
}

export default {
    navigate,
    push,
    nestedNavigate,
    setTopLevelNavigator,
    back,
    authNavigate,
    getCurrentRoute
}
